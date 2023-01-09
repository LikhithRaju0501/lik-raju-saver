import React, { useState, useEffect } from "react";
import Cardcomp from "./Cardcomp";
import "./Home.css";
import { useGetTasks, usePostTasks } from "../../helpers/useGetTasks";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Home = () => {
  const [Tasks, setTasks] = useState([]);
  const [Filter, setFilter] = useState("");
  const [PriorityLevel, setPriorityLevel] = useState("");
  const [radioValue, setRadioValue] = useState("1");

  const onSuccess = (data) => setTasks(data?.data);
  const onError = (error) => alert(error?.message);

  const radios = [
    { name: "All", value: "1" },
    { name: "High", value: "2" },
    { name: "Medium", value: "3" },
    { name: "Low", value: "4" },
  ];

  const priorityMap = {
    1: "All",
    2: "High",
    3: "Medium",
    4: "Low",
  };

  const { isLoading, data, isError, error } = useGetTasks();
  const { mutate } = usePostTasks(onSuccess, onError);

  useEffect(() => {
    if (data) {
      setTasks(data?.data);
    }
  }, [data]);

  const deleteTasks = (id) => {
    const newData = data?.data.filter((item) => item.id !== id);
    mutate(newData);
  };

  const filterPriority = (id) => {
    setRadioValue(id);
    if (id === "1") {
      setPriorityLevel("");
      return;
    }
    const priority = priorityMap[id];
    setPriorityLevel(priority.toLocaleLowerCase());
  };

  const filteredItems = Tasks.filter(
    (item) =>
      item.task.toLocaleLowerCase().includes(Filter) &&
      item.priority.toLocaleLowerCase().includes(PriorityLevel)
  );

  const itemsToDisplay = Filter || PriorityLevel ? filteredItems : Tasks;

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value.toLocaleLowerCase())}
        className="searchBar"
        placeholder="Search Task"
      />

      <ButtonGroup className="buttonGroup">
        {radios.map((radio, idx) => (
          <ToggleButton
            className="toggleButton"
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={
              idx === 0
                ? "outline-primary"
                : idx === 1
                ? "outline-danger"
                : idx === 2
                ? "outline-warning"
                : "outline-success"
            }
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => filterPriority(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <div>
        <div className="allCards">
          {itemsToDisplay?.map((item) => {
            return (
              <Cardcomp key={item.id} blog={item} deleteTasks={deleteTasks} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
