import styled from "@emotion/styled";
import { FiDelete } from "react-icons/fi";
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
  white-space: nowrap;
`;

const FiDeleteWrp = styled.span`
  margin-top: -2px;
`;

const SearchTag = ({ tag, searchTag, deleteTag }: any) => {
  return (
    <Tag onClick={searchTag}>
      <TagLabel>{tag}</TagLabel>
      <FiDeleteWrp>
        <FiDelete width="12px" onClick={deleteTag} />
      </FiDeleteWrp>
    </Tag>
  );
};

export default SearchTag;
