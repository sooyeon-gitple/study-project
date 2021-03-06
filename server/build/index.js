"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = "8000";
app.get('/', (req, res) => res.send('123123'));
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
