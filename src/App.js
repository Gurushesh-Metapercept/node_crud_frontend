import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

function App() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [noteList, setNotesList] = useState([]);
  const [title, setTitle] = useState();
  const [note, setNote] = useState();
  const [updateTitle, setUpdateTitle] = useState();
  const [updateNote, setUpdateNote] = useState();
  const [updateNoteId, setUpdateNoteId] = useState();

  const [isActionTriggered, setIsActionTriggered] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  const handleShow = () => setShow(true);
  const ShowUpdatePopUp = () => setShow1(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://node-crud-backend-8emt.onrender.com/note/", {
        title: title,
        note: note,
      })
      .then((res) => {
        setIsActionTriggered(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    setShow(false);
    setTitle("");
    setNote("");
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    console.log(updateNoteId);
    try {
      axios
        .put(
          `https://node-crud-backend-8emt.onrender.com/note/${updateNoteId}`,
          {
            title: updateTitle,
            note: updateNote,
          }
        )
        .then((res) => {
          setShow1(false);
          setUpdateTitle("");
          setUpdateNote("");
          setUpdateNoteId("");
          setIsActionTriggered(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const handleDelete = (id) => {
    try {
      axios.delete(`https://node-crud-backend-8emt.onrender.com/note/${id}`);
      setIsActionTriggered(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Update
  const handleUpdate = (note) => {
    setUpdateTitle(note.title);
    setUpdateNote(note.note);
    setUpdateNoteId(note._id);
    ShowUpdatePopUp();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://node-crud-backend-8emt.onrender.com/note/"
      );
      setNotesList(response.data.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("in use effect");
    fetchData();
    setIsActionTriggered(false);
  }, [isActionTriggered]);

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Add Product</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <Button variant="warning" className="mt-5" onClick={handleShow}>
          Add Task
        </Button>
      </div>
      <div className="container">
        <div className="w-50 m-auto mt-5">
          {noteList &&
            noteList.map((note) => (
              <div className="col" key={note._id}>
                <Card className="mt-2">
                  <Card.Body className="d-flex justify-content-between">
                    <div>
                      <h5 className="text-start">{note.title}</h5>
                      <p className="text-start">{note.note}</p>
                    </div>

                    <div>
                      <BiSolidEditAlt
                        className="me-3 fs-4 text-primary"
                        onClick={() => handleUpdate(note)}
                        style={{ cursor: "pointer" }}
                      />
                      <RiDeleteBin6Line
                        className="fs-4 text-danger"
                        onClick={() => handleDelete(note._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="task title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>note:</Form.Label>
              <Form.Control
                type="text"
                placeholder="note"
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={updateTitle}
                placeholder="task title"
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>note:</Form.Label>
              <Form.Control
                type="text"
                value={updateNote}
                placeholder="note"
                onChange={(e) => setUpdateNote(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
