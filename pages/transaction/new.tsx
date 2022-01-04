import { Input, Select, Button } from "components";
import { useCallback, useState } from "react";
import { useWindowSize } from "libs/hooks/useWindowSize";
import { Dashboard } from "layout";
import { NextPage } from "next";
import clsx from "clsx";
import { getWarehouseList } from "libs/apis/warehouse";
import useSWR from "swr";
import { useAuth } from "libs/context/AuthContext";
import { getItemList } from "libs/apis/item";

const NewTransaction: NextPage = () => {
  const { width } = useWindowSize();
  const [tableData, setTableData] = useState(defaultData(3));
  const [warehouse, setWarehouse] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const { token } = useAuth();
  const { data: warehouseList } = useSWR(token, getWarehouseList);
  const { data: itemList } = useSWR([token, { warehouse }], getItemList);

  function defaultData(count = 1) {
    const data = [];
    while (count > 0) {
      data.push({ item: "", quantity: 1 });
      count--;
    }
    return data;
  }

  const itemChanged = useCallback<(val: string, idx: number) => void>(
    (val, idx) => {
      if (val) {
        const newData = [...tableData];
        newData[idx] = { item: val, quantity: newData[idx].quantity };
        setTableData(newData);
      }
    },
    [tableData]
  );

  const deleteRow = useCallback(
    (idx) => {
      const newData = [...tableData];
      newData.splice(idx, 1);
      setTableData(newData);
    },
    [tableData]
  );

  const addRow = useCallback(() => {
    const newData = [...tableData];
    newData.push(defaultData()[0]);
    setTableData(newData);
  }, [tableData]);

  const onQuantityChanged = useCallback(
    (val, idx) => {
      const newData = [...tableData];
      newData[idx].quantity = val;
      setTableData(newData);
    },
    [tableData]
  );

  return (
    <Dashboard Title="Transaksi Baru" className="py-8">
      <div className="block md:flex mb-8">
        <div
          className={clsx(
            "flex space-x-2 mb-4 md:mb-0 md:mr-2",
            width < 768 && "overflow-x-auto"
          )}
        >
          <Input
            value={date}
            label="Tanggal Transaksi"
            type="date"
            placeholder="Pilih Tanggal"
            className="w-40"
            onChange={(val) => setDate(val)}
          />
          <Select
            value={type}
            labelHtml="Transaksi"
            placeholder="Pilih Transaksi"
            className="w-32 min-w-fit"
            required
            options={[
              { id: "out", label: "Keluar" },
              { id: "in", label: "Masuk" },
            ]}
            onChange={(val) => setType(val as string)}
          />
          <Select
            value={warehouse}
            labelHtml="Gudang"
            placeholder="Pilih Gudang"
            className="w-44 min-w-fit"
            required
            options={warehouseList}
            idKey="_id"
            labelKey="name"
            onChange={(val) => setWarehouse(val as string)}
          />
        </div>
        <Input
          value={desc}
          label="Keterangan"
          placeholder="Input Keterangan"
          className="w-full md:w-64"
          onChange={(val) => setDesc(val)}
        />
      </div>
      <div>
        <div className="sticky flex justify-between text-2xl font-semibold mb-4">
          <h1>Daftar Barang</h1>
          <Button onClick={addRow}>Tambah Baris</Button>
        </div>
        <div className={clsx(width < 768 && "overflow-x-auto")}>
          <table className="table-parent" style={{ borderSpacing: 0 }}>
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Satuan</th>
                <th>Jumlah</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, idx) => (
                <tr key={idx}>
                  <td className="w-56 md:w-1/2">
                    <Select
                      searchable
                      placeholder="Input Nama Barang"
                      className="w-56 md:w-auto"
                      value={data.item}
                      idKey="_id"
                      labelKey="name"
                      options={itemList}
                      onChange={(val) => itemChanged(val as string, idx)}
                    />
                  </td>
                  <td>
                    <p>
                      {(Array.isArray(itemList) &&
                        itemList.find((val) => val.id === data.item)?.unit) ||
                        "-"}
                    </p>
                  </td>
                  <td>
                    <Input
                      label=""
                      type="number"
                      placeholder="Jumlah Barang"
                      parentClass="w-24 md:w-auto"
                      value={data.quantity}
                      onChange={(val) => onQuantityChanged(val, idx)}
                    />
                  </td>
                  <td>
                    <Button
                      tabIndex={-1}
                      onClick={() => deleteRow(idx)}
                      className={clsx(
                        "danger",
                        tableData.length === 1 && "hidden"
                      )}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Nama Barang</th>
                <th>Satuan</th>
                <th>Jumlah</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex justify-end my-8 space-x-2">
          <Button
            className="w-full md:w-1/4"
            onClick={() => alert(JSON.stringify(tableData))}
          >
            Submit
          </Button>
          <Button className="min-w-fit" onClick={addRow}>
            Tambah Baris
          </Button>
        </div>
      </div>
    </Dashboard>
  );
};

export default NewTransaction;
