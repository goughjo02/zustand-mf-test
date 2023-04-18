import { useStore } from "@remote/store";

export const Token = () => {
  const { token, setToken } = useStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      token: { value: string };
    };
    if (target.token.value) {
      setToken(target.token.value);
    } else {
      setToken(null);
    }
  };
  return (
    <div>
      <p>Remote Token: {token}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="token" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Token;
