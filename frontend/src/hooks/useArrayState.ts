import { useState } from "react"

type UseArrayStateReturn<T> =  [
    Array<T>, 
    {
        set: (values: Array<T>) => void,
        push: (value: T) => void,
        update: (index: number, value: T) => void,
        remove: (index: number) => void;
    }
];
const useArrayState = <T>(defaultValues: Array<T>): UseArrayStateReturn<T> => {

    const [values, setValues] = useState(defaultValues);

    const updateValues = (values: Array<T>) => {
        const newValues = Object.assign([], values);
        setValues(newValues)
    }

    const verifyIndex = (index: number) => {
        if(index < 0 || index >= values.length) {
            throw new Error("当前下标元素不存在");
        }
    }

    const option = {
        set: setValues,
        push(value: T) {
            setValues(values.concat([value]))
        },
        update(index: number, value: T) {
            verifyIndex(index);
            values[index] = value;
            updateValues(values);
        },
        remove(index: number) {
            verifyIndex(index);
            values.splice(index, 1);
            updateValues(values);
        }
    }
    return [values, option];
}
export default useArrayState;