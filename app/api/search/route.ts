import { INDEX_NAME, SearchClient } from "@/data/indexData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  try {
    console.log(searchParams.getAll("sort").map((sort) => JSON.parse(sort)));
    const body = await SearchClient.search({
      index: INDEX_NAME,
      from: Number(searchParams.get("from")) || 0,
      size: Number(searchParams.get("size")) || 10,
      sort: searchParams.getAll("sort").map((sort) => JSON.parse(sort)),
      body: {
        query: query
          ? {
              multi_match: {
                query,
                fields: [
                  "NCT Number",
                  "Study Title",
                  "Conditions",
                  "Brief Summary",
                ],
              },
            }
          : undefined,
      },
    });
    return NextResponse.json(body, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
