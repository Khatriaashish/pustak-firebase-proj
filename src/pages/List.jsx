import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast";

const ListingPage = () => {
  const firebase = useFirebase();

  const ListingSchema = Yup.object({
    bookName: Yup.string().min(1).required(),
    isbn: Yup.string().min(10),
    price: Yup.number().min(0).required(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ListingSchema),
  });
  const bookCreateSubmit = async (data) => {
    try {
      await firebase.handleCreateNewListing(data);
      toast.success("Book created");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <Form onSubmit={handleSubmit(bookCreateSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book name</Form.Label>
            <Form.Control
              type="text"
              {...register("bookName", { required: true })}
              placeholder="Enter book name"
              isInvalid={!!errors.bookName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.bookName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              {...register("isbn", { required: true })}
              placeholder="ISBN Number"
              isInvalid={!!errors.isbn}
            />
            <Form.Control.Feedback type="invalid">
              {errors.isbn?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              {...register("price", { required: true })}
              placeholder="Enter Price"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cover Page</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setValue("cover", e.target.files[0]);
              }}
              placeholder="Upload Cover Image"
              isInvalid={!!errors.cover}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cover?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ListingPage;
