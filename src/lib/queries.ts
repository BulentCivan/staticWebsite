export const PAGE_BY_ID = `
query PageById($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    
    content
  }
}
`;
