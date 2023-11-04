export const Index = () => {
  const createRoomHandler = async () => {
    // TODO: 部屋作成APIを叩く(/api/roomsはapiが分かり次第変更する)
    const res = await fetch("/api/v1/create", { method: "POST" });
    const { roomId } = await res.json();
    // TODO: 作成した部屋に遷移する
    window.location.hash = `/watch/${roomId}`;
  };
  return (
    <div>
      <h1>部屋作成</h1>
      <button onClick={() => createRoomHandler()}>作成</button>
    </div>
  );
};
