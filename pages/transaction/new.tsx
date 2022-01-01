import { Select } from "components";
import { Dashboard } from "layout";
import { NextPage } from "next";

const options = [
  {id: 1, value: "Option 1"},
  {id: 2, value: "Option 2"},
  {id: 3, value: "Option 3"},
  {id: 4, value: "Option 4"},
  {id: 5, value: "Option 5"},
  {id: 6, value: "Option 6"},
  {id: 7, value: "Option 7"},
  {id: 8, value: "Option 8"},
  {id: 9, value: "Option 9"},
  {id: 10, value: "Option 10"},
]

const NewTransaction: NextPage = () => {
  return (
    <Dashboard Title="Transaksi Baru" className="py-8">
      <Select
        label="Select item"
        placeholder="AYY"
        className="w-48"
        options={options}
        useSearch
      />
    </Dashboard>
  );
};

export default NewTransaction;
