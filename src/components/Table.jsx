import { createRef, useEffect, useMemo } from "react";

export default function Table({
  initialFields = null,
  itemsArray = [],
  refs = null,
  handleDelete,
  handleSendItem = null,
}) {
  const headers = useMemo(
    () =>
      itemsArray && itemsArray.length > 0 ? Object.keys(itemsArray[0]) : [],
    [itemsArray]
  );

  useEffect(() => {
    if (!refs || !refs.current || !initialFields) return;
    for (const key of Object.keys(initialFields)) {
      if (!refs.current[key]) {
        refs.current[key] = createRef();
      }
    }
  }, [refs, initialFields]);

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-zebra lg:table-md md:table-md sm:table-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th className="text-center" key={i}>
                {h}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {initialFields && (
            <tr>
              {Object.keys(initialFields).map((key) => (
                <td className="text-center" key={key}>
                  {typeof initialFields[key] === "boolean" ? (
                    <input
                      ref={refs?.current?.[key]}
                      type="checkbox"
                      className="checkbox"
                      defaultChecked={Boolean(initialFields[key])}
                    />
                  ) : (
                    <input
                      ref={refs?.current?.[key]}
                      type="text"
                      className="input input-sm w-full"
                      placeholder={String(initialFields[key] ?? "")}
                    />
                  )}
                </td>
              ))}

              <td
                className="text-center"
                colSpan={Math.max(
                  0,
                  headers.length - Object.keys(initialFields).length
                )}
              ></td>

              <td>
                {handleSendItem && (
                  <button
                    onClick={() => handleSendItem()}
                    className="btn btn-primary btn-md w-full"
                  >
                    Send Item
                  </button>
                )}
              </td>
            </tr>
          )}

          {itemsArray.map((item, i) => (
            <tr key={item?.id ?? i}>
              {headers.map((h, j) => (
                <td className="text-center text-nowrap" key={j}>
                  {item?.[h] !== undefined && item?.[h] !== null
                    ? String(item[h])
                    : ""}
                </td>
              ))}
              <td className="gap-1 flex">
                <button className="btn btn-sm btn-primary">Edit</button>
                <button
                  onClick={() => handleDelete(item?.id ?? i)}
                  className="btn btn-sm btn-secondary"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
