import { simpleQueue } from "./workers";

interface JobParams {
  depositTx: string;
  sourceChain: string;
  destinationChain: string;
}

export async function sendJobAndGetJobId({
  depositTx,
  sourceChain,
  destinationChain,
}: JobParams): Promise<string> {
  const jobId = `${depositTx}_${sourceChain}`;

  await simpleQueue.add(
    "simpleMessageReceptionQueue",
    {
      depositTx,
      sourceChain,
      destinationChain,
    },
    { jobId }
  );
  return Promise.resolve(jobId);
}

export async function checkJobStatus(jobId: string): Promise<any> {
  console.log("getting job with id: ", jobId);
  const job = await simpleQueue.getJob(jobId);
  console.log("job: ", job);
  if (job) {
    const jobState = await job.getState();
    console.log("jobState: ", jobState);
    if (jobState == "completed")
      return Promise.resolve({ jobState, hash: job.returnvalue.hash });
    return Promise.resolve({
      jobState,
      log: job.log,
      data: job.data,
      failReason: job.failedReason,
    });
  }
  return Promise.reject(new Error("Cannot find job"));
}
