import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const loginSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginSubmit = async (data) => {
    try {
      await firebase.signInWithEmailAndPass(data.email, data.password);
      toast.success("User login successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) navigate("/");
  }, [firebase, navigate]);

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit(loginSubmit)}>
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
          Sign In
        </Button>
      </Form>
      <h4 className="mt-1 mb-1">OR</h4>
      <Button variant="danger" onClick={firebase.signInWithGoogle}>
        Sign In With Google
      </Button>
    </div>
  );
};

export default Login;
