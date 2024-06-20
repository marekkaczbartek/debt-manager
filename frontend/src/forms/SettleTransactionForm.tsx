import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";

interface SettleTransactionFormProps {
  onClose: () => void;
  transactionId?: number;
}

export default function SettleTransactionForm({
  onClose,
  transactionId,
}: SettleTransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [fullAmount, setFullAmount] = useState(0); // Example transaction amount, replace with your actual amount

  useEffect(() => {
    const fetchTransactionAmount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/transactions/${transactionId}`
        );
        setFullAmount(res.data.amount);
      } catch {
        throw new Error("Error fetching transaction amount");
      }
    };
    fetchTransactionAmount();
  }, [transactionId]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsAllChecked(isChecked);
    if (isChecked) {
      setAmount(fullAmount.toString());
    } else {
      setAmount("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/transactions/${transactionId}/settle`,
        {
          amount: parseFloat(amount),
        }
      );
      onClose();
    } catch {
      throw new Error("Error fetching updated transactions");
    }
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2.5 border rounded-lg text-sm"
          />
          <label className="ml-4 flex items-center">
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            All
          </label>
        </div>
        <Button className="p-4 my-4 w-full" type="submit">
          OK
        </Button>
      </form>
    </>
  );
}
