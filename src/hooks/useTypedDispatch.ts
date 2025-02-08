import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

// Кастомный хук для Redux Dispatch с правильными типами
export const useTypedDispatch = () => useDispatch<AppDispatch>();
