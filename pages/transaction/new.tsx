/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useWindowSize } from "libs/hooks/useWindowSize";
import { useAuth } from "libs/context/AuthContext";
import { Input, Select, Button, Toast } from "components";
import { Item, ResOK } from "type";
import { Dashboard } from "layout";
import { NextPage } from "next";
import dayjs from "dayjs";
import useSWR from "swr";
import clsx from "clsx";

const NewTransaction: NextPage = () => {
  const { fetcher } = useAuth();
  const { width } = useWindowSize();
  const [toast, setToast] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [type, setType] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [desc, setDesc] = useState(`Transaksi ${dayjs().format("DD MMMM")}`);
  const [items, setItems] = useState(defaultData(2));

  const Warehouses = () => {
    const { data } = useSWR<ResOK<any>>("/warehouse", fetcher);
    return data ? data : { data: [] };
  };

  const { data: Items } = useSWR<ResOK<Item[]>>(
    warehouse ? `/item?warehouse=${warehouse}` : null,
    fetcher
  );

  useEffect(() => {
    setItems([...defaultData(items.length)]);
  }, [warehouse]);

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
        const newData = [...items];
        newData[idx] = { item: val, quantity: newData[idx].quantity };
        setItems(newData);
      }
    },
    [items]
  );

  const handleSubmit = () => {
    if (!items.find((item) => !item.item || item.quantity < 1)) {
      setIsLoading(true);
      fetcher<any>("/transaction", {
        method: "post",
        data: {
          txDate: date,
          description: desc,
          type,
          warehouse,
          items: items,
        },
      })
        .then(() => {
          setItems(defaultData(2));
          setToast({
            type: "success",
            message: "Transaksi berhasil dibuat",
          });
        })
        .catch(({ response }) => {
          setToast({
            type: "error",
            message: response.data.message,
          });
        })
        .finally(() => setIsLoading(false));
    } else {
      setToast({
        type: "error",
        message: "Barang dan jumlah tidak boleh kosong",
      });
    }
  };

  const deleteRow = useCallback(
    (idx) => {
      const newData = [...items];
      newData.splice(idx, 1);
      setItems(newData);
    },
    [items]
  );

  const addRow = useCallback(() => {
    const newData = [...items];
    newData.push(defaultData()[0]);
    setItems(newData);
  }, [items]);

  const onQuantityChanged = useCallback(
    (val, idx) => {
      const newData = [...items];
      newData[idx].quantity = val;
      setItems(newData);
    },
    [items]
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
            options={Warehouses().data}
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
              {items.map((data, idx) => (
                <tr key={idx}>
                  <td className="w-56 md:w-1/2">
                    <Select
                      searchable
                      placeholder="Input Nama Barang"
                      className="w-56 md:w-auto"
                      value={data.item}
                      idKey="_id"
                      labelKey="name"
                      options={Items?.data || []}
                      onChange={(val) => itemChanged(val as string, idx)}
                    />
                  </td>
                  <td>
                    <p>
                      {(Items?.data &&
                        Items?.data.find((val) => val._id === data.item)
                          ?.unit) ||
                        "-"}
                    </p>
                  </td>
                  <td>
                    <Input
                      label=""
                      type="number"
                      placeholder="Jumlah Barang"
                      className="w-24 md:w-auto"
                      value={data.quantity}
                      onChange={(val) => onQuantityChanged(val, idx)}
                    />
                  </td>
                  <td>
                    <Button
                      tabIndex={-1}
                      onClick={() => deleteRow(idx)}
                      className={clsx("danger", items.length === 1 && "hidden")}
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
            isLoading={isLoading}
            className="w-full md:w-1/4"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button className="min-w-fit" onClick={addRow}>
            Tambah Baris
          </Button>
        </div>
      </div>
      <Toast content={toast} noMultiple />
    </Dashboard>
  );
};

export default NewTransaction;
