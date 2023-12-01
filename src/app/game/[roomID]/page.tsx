"use client";

export default function Game({ params }: { params: { roomID: string } }) {
  console.log(params.roomID);
}

export { Game };
