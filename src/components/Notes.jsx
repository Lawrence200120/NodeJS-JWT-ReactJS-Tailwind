import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/notes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setNotes(data);
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!form.title.trim()) {
      tempErrors.title = "Title is required";
      isValid = false;
    }
    if (!form.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchNotes();
      handleReset();
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, description: note.description });
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const handleReset = () => {
    setForm({ title: "", description: "" });
    setErrors({});
    setEditId(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Notes Dashboard
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6"
      >
        {/* Title */}
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            className={`w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            className={`w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg text-center">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="py-2 px-2 border">Title</th>
              <th className="py-2 px-2 border">Description</th>
              <th className="py-2 px-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-gray-500 py-3 border"
                >
                  No Notes Found
                </td>
              </tr>
            ) : (
              notes.map((note) => (
                <tr key={note._id} className="border">
                  <td className="py-2 px-2 border">{note.title}</td>
                  <td className="py-2 px-2 border">{note.description}</td>
                  <td className="py-2 px-2 border flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notes;