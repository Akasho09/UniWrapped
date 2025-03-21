import express from 'express';
import aksh from "@repo/db/client";

const app = express();
app.use(express.json());

// Define payment info interface
interface PaymentInfo {
  token: string;
}

app.get("/hdfcwebhook", async (req, res) => {
  try {
    const paymentInfo: PaymentInfo = {
      token: req.body.token,
    };

    // Validate input
    if (!paymentInfo.token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    const result = await aksh.$transaction(async (tx) => {
      // Check transaction status first
      const transaction = await tx.onRampTransaction.findFirst({
        where: {
          token: paymentInfo.token,
        },
        select: {
          amount: true,
          userId: true,
          status: true,
        },
      });

      // Handle invalid transaction
      if (!transaction) {
        return { success: false, message: "Invalid Transaction" };
      }

      // Handle already processed transaction
      if (transaction.status === "Success") {
        return { success: false, message: "Transaction already processed" };
      }

      // Update transaction status
      await tx.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      });

      // Update balance
      await tx.balance.update({
        where: {
          userId: transaction.userId,
        },
        data: {
          amount: {
            increment: transaction.amount,
          },
        },
      });

      return { success: true, message: "Captured" };
    });

    // Send response based on transaction result
    if (result.success) {
      res.json({
        message: result.message,
      });
    } else {
      res.status(400).json({
        message: result.message,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: e instanceof Error ? e.message : "Internal server error",
    });
  }
});

app.listen(3004, () => {
  console.log("Web Bank started on port 3004");
});