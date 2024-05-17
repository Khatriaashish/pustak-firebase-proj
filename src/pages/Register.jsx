import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const registerSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerSubmit = async (data) => {
    try {
      await firebase.signUpWithEmailAndPassword(data.email, data.password);
      toast.success("User registered successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) navigate("/");
  }, [firebase, navigate]);

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit(registerSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Register;
