import styled from "styled-components";
import { FiDelete } from "react-icons/Fi";
const Tag = styled.div`
  display: flex;
  font-size: 14px;
  border-radius: 16px;
  padding: 6px 10px;
  color: #ffffff;
  background-color: #4cabff;
  cursor: pointer;
  &:hover {
    background-color: #8ac8ff;
  }
  margin: 4px;
`;

const TagLabel = styled.span`
  margin-right: 4px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const SearchTag = ({ tag, searchTag, deleteTag }: any) => {
  return (
    <Tag onClick={searchTag}>
      <TagLabel>{tag}</TagLabel>
      <FiDelete width="12px" onClick={deleteTag} />
    </Tag>
  );
};

export default SearchTag;
