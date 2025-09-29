import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';
import createToken from '../utils/createToken.js';

const signupStudent = asyncHandler(async (req, res) => {
    const { name, studentPassword, studentEmail, studentPhone } = req.body;
    const existing = await Student.find({ studentEmail });
    if(existing){
        return res.status(400).json({ message: "Student Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(studentPassword, 10);
    const newStudent = new Student({
        name,
        studentEmail,
        studentPhone,
        studentPassword: hashedPassword
    }); 
    try {
        await newStudent.save();
        createToken(res, newStudent._id);
        res.status(201).json({
            _id: newStudent._id,
            name: newStudent.name,
            studentEmail: newStudent.studentEmail,
            studentPhone: newStudent.studentPhone,
            message: "SignUp and Login Successful"
        });
    } catch (error) {
        res.status(500);
        throw new Error("Invalid student data. Please check your inputs.");
    }
 });
const loginStudent = asyncHandler(async (req, res) => {
    const { studentEmail, studentPassword } = req.body;
    const student = await Student.findOne({ studentEmail });
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    const isMatch = await bcrypt.compare(studentPassword, student.studentPassword);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    createToken(res, student._id);
    res.status(200).json({
        _id: student._id,
        name: student.name,
        studentEmail: student.studentEmail,
        studentPhone: student.studentPhone,
        message: "Login Successful"
    });
});

const logoutStudent = asyncHandler(async (req, res) => {
    res.cookie('jwt',"", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: "Logout Successful" });
});

const updateCurrentStudent = asyncHandler(async (req, res) => { 
    const student = await Student.findById(req.student._id);
    if (student) {
        student.name = req.body.name || student.name;
        student.studentEmail = req.body.studentEmail || student.studentEmail;
        student.studentPhone = req.body.studentPhone || student.studentPhone;
        if (req.body.studentPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.studentPassword, salt);
            student.studentPassword = hashedPassword;
        }
        const updatedStudent = await student.save();
        res.json({
            _id: updatedStudent._id,
            name: updatedStudent.name,
            studentEmail: updatedStudent.studentEmail,
            studentPhone: updatedStudent.studentPhone,
            message: "Profile updated successfully",
        });
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

const getCurrentStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.student._id);
    if(student){
        res.json({
            _id: student._id,
            name: student.name,
            studentEmail: student.studentEmail,
            studentPhone: student.studentPhone,
        })
    }else{
        res.status(404);
        throw new Error("Student not found");
    }
 });

 export { signupStudent, loginStudent, logoutStudent, updateCurrentStudent, getCurrentStudent };
