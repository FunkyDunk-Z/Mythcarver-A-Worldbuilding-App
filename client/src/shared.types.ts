import { ReactNode, ChangeEvent, FormEvent, MouseEvent } from "react";

export type ReactProps = {
  children: ReactNode;
};

export type InputEventType = ChangeEvent<HTMLInputElement>;
export type FormEventType = FormEvent<HTMLFormElement>;
export type MouseEventType = MouseEvent<HTMLButtonElement, MouseEvent>;

export interface AxiosError {
  message: string;
  errors: Record<string, string[]>;
}

export type CodexType = {
  _id: string;
  codexName: string;
  campaigns: string[];
  characters: string[];
  factions: string[];
  species: string[];
  traits: string[];
  nations: string[];
  locations: string[];
  settlements: string[];
  items: string[];
  bestairy: string[];
  lore: string[];
};

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarURL: string;
  codex: CodexType[];
}

export type IUserState = IUser | null;

type SetUser = {
  type: "SET_USER";
  payload: IUserState;
};

type ClearUser = {
  type: "CLEAR_USER";
};

export type TAuthReducer = SetUser | ClearUser;
