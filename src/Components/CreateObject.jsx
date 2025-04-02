import { useState, useEffect } from "react";

const CreateObject = () => {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [objectId, setObjectId] = useState("");
  const [response, setResponse] = useState(null);
  const [objects, setObjects] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !features || !price || !year) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    
    const data = {
      name,
      data: {
        features,
        price: Number(price),
        year: Number(year)
      }
    };

    try {
      const res = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      setResponse(result);
      localStorage.setItem("miApp_objectId", result.id);
      setObjectId(result.id);

      setName("");
      setFeatures("");
      setPrice("");
      setYear("");
    } catch (error) {
      console.error("Error al crear el objeto:", error);
    }
  };

  return (
    <div>
      <h2>Crear</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={!name || !features || !price || !year}>Crear</button>
      </form>
            
      {response && (
        <pre>
          {JSON.stringify(
            {
              name: response.name,
              data: response.data
            },
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
};

export default CreateObject;
