"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Home Page");
});
app.get("/login", (req, res) => {
    res.send("Login Page");
});
app.listen(3000, () => {
    console.log("Server started at 3000");
});
