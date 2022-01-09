import { FC } from "react";

type Data = { [key: string]: any };

interface Props {
  data: Data[];
  footer?: boolean;
  onChange?: (data: Data[]) => void;
}

export const Table: FC<Props> = (props) => {
  const { data, footer, onChange } = props;
  const columns = Object.keys(data[0]);
  return (
    <table className="table-parent" style={{ borderSpacing: 0 }}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>
                <div>{row[column]}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
};
