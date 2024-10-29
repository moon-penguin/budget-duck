export function errorHandlerUtils(error: unknown, title: string) {
  if (error instanceof Error) {
    throw new Error(`[ ${title} ] failed: ${error.message}`);
  }
}
