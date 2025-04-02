import { useState, useEffect } from "react";

const DeleteObject = () => {
  const [objectId, setObjectId] = useState(null);

  // Estado para los campos de datos del objeto
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    // Cargar el ID del objeto desde localStorage cuando el componente se monta
    const storedObjectId = localStorage.getItem("miApp_objectId");
    if (storedObjectId) {
      setObjectId(storedObjectId);
      
      // Si el ID está presente, cargar los datos del objeto
      fetch(`https://api.restful-api.dev/objects/${storedObjectId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setFeatures(data.data.features);
          setPrice(data.data.price);
          setYear(data.data.year);
        })
        .catch((error) => console.error("Error al obtener el objeto:", error));
    }
  }, []);

  const handleDelete = async () => {
    if (!objectId) {
      alert("No hay un ID guardado para eliminar.");
      return;
    }

    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este objeto?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://api.restful-api.dev/objects/${objectId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Objeto eliminado correctamente.");
        
        // Eliminar el ID y los datos del localStorage
        localStorage.removeItem("miApp_objectId");
        
        // Limpiar el estado para reflejar la eliminación en la UI
        setObjectId(null);
        setName("");
        setFeatures("");
        setPrice("");
        setYear("");
      } else {
        alert("Error al eliminar el objeto.");
      }
    } catch (error) {
      console.error("Error al eliminar el objeto:", error);
    }
  };

  return (
    <div>
      <h2>Eliminar Objeto</h2>
      {objectId ? (
        <>
          <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
            Eliminar Objeto
          </button>
        </>
      ) : (
        <p>No hay un objeto disponible para eliminar.</p>
      )}
    </div>
  );
};

export default DeleteObject;
