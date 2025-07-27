import { ErrorHandler } from "@/lib/utils/error-handler";

export const queryErrorHandler = (error: unknown, queryKey: string[]) => {
  console.error(`Query error for ${queryKey.join(".")}:`, error);
  ErrorHandler.handle(error, `query: ${queryKey.join(".")}`);
};

export const mutationErrorHandler = (error: unknown, mutationKey: string[]) => {
  console.error(`Mutation error for ${mutationKey.join(".")}:`, error);
  ErrorHandler.handle(error, `mutation: ${mutationKey.join(".")}`);
};
