import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputGroup,
  FormControl,
  Button,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
import { useGetTasks, usePostTasks } from "../../helpers/useGetTasks";

const Blog = () => {
  // <---------- Destructuring ---------->
  const [image, setimage] = useState();
  const [radioValue, setRadioValue] = useState("1");

  let navigate = useNavigate();

  const { isLoading, data, error: getError, isError } = useGetTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSuccess = () => {
    let path = "/";
    navigate(path);
  };

  const onError = (error) => {
    alert(error?.message);
  };
  const { mutate, isLoading: postLoading } = usePostTasks(onSuccess, onError);

  // <---------- Destructuring ---------->

  // <---------- Constants ---------->
  const radios = [
    { name: "High", value: "1" },
    { name: "Medium", value: "2" },
    { name: "Low", value: "3" },
  ];

  const priorityMap = {
    1: "High",
    2: "Medium",
    3: "Low",
  };

  const validations = {
    task: { required: "Task is required" },
    content: {
      required: "Content of your blog is required",
      minLength: {
        value: 10,
        message: "Content should be minimun 10 characters",
      },
    },
  };

  // <---------- Constants ---------->

  // <----------Form Methods ---------->
  const FormSubmit = (response) => {
    const id = data?.data[data?.data?.length - 1].id + 1;
    const toAdd = {
      id,
      ...response,
      priority: priorityMap[radioValue],
      image,
    };
    const task = [...data?.data, toAdd];
    mutate(task);
  };
  // <----------Form Methods ---------->

  // <----------Image Handler ---------->

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setimage(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  // <----------Image Handler ---------->

  if (isLoading) return <div>Loading</div>;

  if (isError)
    return (
      <div>Sorry We cannot get details at the time, {getError?.message}</div>
    );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="formPart">
          <form onSubmit={handleSubmit(FormSubmit)}>
            <InputGroup className="mb-1">
              <InputGroup.Text id="basic-addon1">Task</InputGroup.Text>
              <FormControl
                name="task"
                {...register("task", validations.task)}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <div className="errorMessage">{errors?.task?.message}</div>
            <Form.Control
              as="textarea"
              placeholder="Post Your Content Here"
              style={{ height: "30vh", marginBottom: "1vh" }}
              name="content"
              {...register("content", validations.content)}
            />
            <div className="errorMessage">{errors?.content?.message}</div>
            <Form.Group>
              <Form.Label>Priority</Form.Label> <br />
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={
                      idx === 0
                        ? "outline-danger"
                        : idx === 1
                        ? "outline-warning"
                        : "outline-success"
                    }
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>{" "}
            <br />
            <Form.Group controlId="formFileSm">
              <Form.Label>Upload Blog Image</Form.Label>
              <Form.Control
                onChange={(e) => handleImage(e)}
                type="file"
                accept="image/*"
                size="sm"
              />
            </Form.Group>{" "}
            <br />
            {image ? (
              <div>
                <img src={image} alt="Upload" width="100%" height="200px" />{" "}
                <br /> <br />
              </div>
            ) : (
              <div></div>
            )}
            <br />
            {postLoading && <div>Posting</div>}
            <Button type="submit" variant="success">
              POST
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Blog;
