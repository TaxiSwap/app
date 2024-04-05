import { NextResponse } from "next/server";

import { checkJobStatus } from "@/queue/jobs";

export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  const jobId = params.jobId;
  console.log("jobId: ", jobId);

  if (!jobId) {
    return NextResponse.json(
      { error: "jobId query parameter is required." },
      { status: 400 }
    );
  }

  try {
    console.log("API trying to get job status with job id: ", jobId);
    const jobStatus = await checkJobStatus(jobId);

    if (jobStatus) {
      return NextResponse.json(jobStatus, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Job not found or job status unavailable." },
        { status: 404 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error checking job status:", errorMessage);
    return NextResponse.json(
      { error: "Unexpected error checking job status." },
      { status: 500 }
    );
  }
}
