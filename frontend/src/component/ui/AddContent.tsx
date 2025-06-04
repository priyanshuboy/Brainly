import { Closeicon } from "../icon/Closeicon";
import { Button } from "./button";

// Controlled Modal Component
export function Addcontent({ Open, OnClose }: { Open: boolean; OnClose: () => void }) {
  return (
    <div>
      {Open && (
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded p-6 relative z-10">
            <div className="cursor-pointer absolute top-2 right-2" onClick={OnClose}>
              <Closeicon />
            </div>

            <div className="mt-8">
              <Input placeholder="Title" onChange={() => {}} />
              <Input placeholder="Link" onChange={() => {}} />
            </div>
            <div className="flex justify-center">
            <Button text="Submit" variant="primary" />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Input Component
export function Input({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 border rounded m-2 w-full"
        onChange={onChange}
      />
    </div>
  );
}

