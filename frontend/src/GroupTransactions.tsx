import { useState } from "react";
import Button from "./components/Button";

export default function GroupTransactions() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Button onClick={toggleModal}>Hello</Button>

      <div>
        <div className="bg-blend-overlay"></div>
      </div>
    </>
  );
}
