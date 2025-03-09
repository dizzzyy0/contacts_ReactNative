import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import AddContactModal from "@/components/myComponents/FormForContact";
import ViewContacts from "@/components/myComponents/viewContacts";
import Contact from "@/constants/Contact";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    setLoading(true);
    setError(null);
    
    fetch("http://192.168.0.102:5000/contacts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Помилка сервера: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Помилка завантаження контактів:", err);
        setError("Не вдалося завантажити контакти");
        setLoading(false);
      });
  };

  const addContact = (contact: Contact) => {
    fetch("http://192.168.0.102:5000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Помилка сервера: ${res.status}`);
        }
        return res.json();
      })
      .then((newContact) => {
        setContacts((prev) => [...prev, newContact]);
        Alert.alert("Успіх", "Контакт успішно додано!");
      })
      .catch((err) => {
        console.error("Помилка додавання контакту:", err);
        Alert.alert("Помилка", "Не вдалося додати контакт");
      });
  };

  const editContact = (contact: Contact) => {
    fetch(`http://192.168.0.102:5000/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Помилка сервера: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedContact) => {
        setContacts((prev) => 
          prev.map((c) => c.id === updatedContact.id ? updatedContact : c)
        );
        Alert.alert("Успіх", "Контакт успішно оновлено!");
        setEditingContact(null);
      })
      .catch((err) => {
        console.error("Помилка оновлення контакту:", err);
        Alert.alert("Помилка", "Не вдалося оновити контакт");
      });
  };

  const deleteContact = (id: string) => {
    Alert.alert(
      "Видалення контакту",
      "Ви впевнені, що хочете видалити цей контакт?",
      [
        { text: "Скасувати", style: "cancel" },
        { 
          text: "Видалити", 
          style: "destructive",
          onPress: () => {
            fetch(`http://192.168.0.102:5000/contacts/${id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`Помилка сервера: ${res.status}`);
                }
                
                setContacts((prev) => prev.filter((contact) => contact.id !== id));
                Alert.alert("Успіх", "Контакт успішно видалено!");
              })
              .catch((err) => {
                console.error("Помилка видалення контакту:", err);
                Alert.alert("Помилка", "Не вдалося видалити контакт");
              });
          }
        }
      ]
    );
  };

  const handleEditPress = (contact: Contact) => {
    setEditingContact(contact);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingContact(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Телефонна книга</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle" size={34} color="#007aff" />
          </TouchableOpacity>
        </View>
        
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={24} color="#ff3b30" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={loadContacts}
            >
              <Text style={styles.retryButtonText}>Спробувати знову</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007aff" />
            <Text style={styles.loadingText}>Завантаження контактів...</Text>
          </View>
        ) : (
          <>
            <AddContactModal
              visible={modalVisible}
              onClose={handleModalClose}
              onAddContact={addContact}
              onEditContact={editContact}
              contact={editingContact}
            />
            
            <ViewContacts
              contacts={contacts}
              onDeleteContact={deleteContact}
              onEditContact={handleEditPress}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  addButton: {
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffefef',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    marginVertical: 8,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007aff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});