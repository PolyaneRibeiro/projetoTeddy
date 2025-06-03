import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);
  return (
    <View style={styles.container}>
      {pages.map((page) => (
        <TouchableOpacity
          key={page}
          onPress={() => onPageChange(page)}
          style={[
            styles.pageButton,
            currentPage === page && styles.activePage,
          ]}
        >
          <Text
            style={[
              styles.pageText,
              currentPage === page && styles.activeText,
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  pageButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  pageText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  activePage: {
    backgroundColor: "#f58020",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Pagination

