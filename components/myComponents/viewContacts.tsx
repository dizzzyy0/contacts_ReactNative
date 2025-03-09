import React, { useMemo } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SectionList
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Contact from "@/constants/Contact";
import { styles } from "@/assets/styles/ViewContacts";

interface ViewContactsProps {
  contacts: Contact[];
  onDeleteContact: (id: string) => void;
  onEditContact: (contact: Contact) => void;
}

const ViewContacts: React.FC<ViewContactsProps> = ({ 
  contacts, 
  onDeleteContact,
  onEditContact 
}) => {
  const contactSections = useMemo(() => {
    const sortedContacts = [...contacts].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
    const sections: { title: string; data: Contact[] }[] = [];
    const groupedContacts: { [key: string]: Contact[] } = {};
    
    sortedContacts.forEach(contact => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
    });
    
    Object.keys(groupedContacts)
      .sort()
      .forEach(letter => {
        sections.push({
          title: letter,
          data: groupedContacts[letter]
        });
      });
    
    return sections;
  }, [contacts]);

  const getAvatarColor = (name: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', 
      '#FB5607', '#8338EC', '#3A86FF', '#FF006E'
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase();
  };

  // Рендер елемента контакту
  const renderContactItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      {/* Аватар */}
      <View 
        style={[
          styles.avatar, 
          { backgroundColor: getAvatarColor(item.name) }
        ]}
      >
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.contactInfo}
        onPress={() => onEditContact(item)}
      >
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
        {item.email && (
          <Text style={styles.contactEmail}>{item.email}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => onDeleteContact(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="person-outline" size={80} color="#cccccc" />
      <Text style={styles.emptyText}>Ваша телефонна книга порожня</Text>
      <Text style={styles.emptySubText}>Додайте новий контакт, натиснувши кнопку "+"</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Список контактів</Text>
      
      {contacts.length > 0 ? (
        <SectionList
          sections={contactSections}
          keyExtractor={(item) => item.id}
          renderItem={renderContactItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyListComponent />
      )}
    </View>
  );
};

export default ViewContacts;