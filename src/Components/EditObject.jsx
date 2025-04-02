import { useState, useEffect } from "react";

const EditObject = () => {
  const [objectId, setObjectId] = useState(localStorage.getItem("miApp_objectId"));
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (objectId) {
      // Si el objectId está presente, obtenemos los datos del objeto desde la API
      fetch(`https://api.restful-api.dev/objects/${objectId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setFeatures(data.data.features);
          setPrice(data.data.price);
          setYear(data.data.year);
        })
        .catch((error) => console.error("Error al obtener el objeto:", error));
    }
  }, [objectId]); // Solo carga los datos si hay un objectId

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !features || !price || !year) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const updatedData = {
      name,
      data: {
        features,
        price: Number(price),
        year: Number(year),
      },
    };

    try {
      const res = await fetch(`https://api.restful-api.dev/objects/${objectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      setResponse(result);
      alert("Objeto actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el objeto:", error);
    }
  };

  return (
    <div>
      <h2>Editar Objeto</h2>
      {objectId ? (
        <>
          <p>ID del objeto: {objectId}</p>
          <form onSubmit={handleUpdate}>
            <input 
              type="text" 
              placeholder="Nombre" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              placeholder="Características" 
              value={features} 
              onChange={(e) => setFeatures(e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Precio" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Año" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              required 
            />
            <button type="submit" disabled={!name || !features || !price || !year}>Actualizar</button>
          </form>
        </>
      ) : (
        <p>No hay un objeto disponible para editar. Asegúrate de haber creado un objeto antes.</p>
      )}
    </div>
  );
};

export default EditObject;
