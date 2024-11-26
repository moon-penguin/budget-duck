import { ConvenientFileSysOps } from './fileOps.utils';

export async function retrieveSchema(pathToSchemaFile: string) {
  const schema = await ConvenientFileSysOps.readFile(pathToSchemaFile);
  return JSON.parse(schema);
}
