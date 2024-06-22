import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
function Student() {
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setMobile] = useState("");
  const [employees, setUsers] = useState([]);

  // useEffect(() => {
  //   (async () => await Load())();
  // }, []);

  async function Load() {
    const result = await axios
      .get("http://localhost:5000/students")
      .then((res) => {
        let employee = JSON.stringify(res.data);
        setUsers(employee);
        console.log(result.data);
      });
  }

  const { data } = useQuery({
    queryKey: ["employee"],
    queryFn: () =>
      fetch("http://localhost:5000/students").then((res) => res.json()),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.error(error),
  });

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/student/create", {
        name: name,
        address: address,
        phone: phone,
      });
      alert("Student Registation Successfully");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }
  async function editEmployee(employees) {
    setName(employees.name);
    setAddress(employees.address);
    setMobile(employees.phone);

    setId(employees._id);
  }

  async function DeleteEmployee(_id) {
    await axios.delete("http://localhost:5000/students/" + _id);
    alert("Employee deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:5000/students/" +
          employees.find((u) => u._id === _id)._id || _id,
        {
          _id: _id,
          name: name,
          address: address,
          phone: phone,
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="_id"
              hidden
              value={_id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Employee Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Student Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <label>Mobile</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              value={phone}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
            />
          </div>

          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Student Address</th>
            <th scope="col">Student Mobile</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {data?.map((employee) => (
          <tbody>
            <tr>
              <th scope="row">{employee._id} </th>
              <td>{employee.name}</td>
              <td>{employee.address}</td>
              <td>{employee.phone}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editEmployee(employee)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteEmployee(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Student;