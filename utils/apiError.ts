import { NextResponse } from "next/server";

export const handleError = (error: any) => {
  console.error("❌ Error trace:", error);

  // Handle Mongoose Validation Errors
  if (error.name === "ValidationError") {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Handle Generic Errors
  return NextResponse.json(
    { error: "Something went wrong on the server." },
    { status: 500 }
  );
};