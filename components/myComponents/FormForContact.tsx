import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  SafeAreaView,
  ScrollView,
  StatusBar
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Contact from "@/constants/Contact";
import { styles } from "@/assets/styles/FormForContact";

interface Errors {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface PhoneField {
  id: string;
  value: string;
}

interface EmailField {
  id: string;
  value: string;
}

interface AddContactModalProps {
  visible: boolean;
  onClose: () => void;
  onAddContact: (contact: Contact) => void;
  onEditContact?: (contact: Contact) => void;
  contact?: Contact | null;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ 
  visible, 
  onClose, 
  onAddContact,
  onEditContact,
  contact 
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneFields, setPhoneFields] = useState<PhoneField[]>([]);
  const [emailFields, setEmailFields] = useState<EmailField[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      resetForm();
      
      if (contact) {
        setIsEditing(true);
        
        const nameParts = contact.name.split(' ');
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
        
        if (contact.phone) {
          setPhoneFields([{ id: 'phone-1', value: contact.phone }]);
        }
        
        if (contact.email) {
          setEmailFields([{ id: 'email-1', value: contact.email }]);
        }
      } else {
        setIsEditing(false);
      }
    }
  }, [visible, contact]);

  const handleSubmit = () => {
    if (!firstName.trim()) {
      setErrors({ name: "Ім'я обов'язкове" });
      return;
    }

    if (phoneFields.length === 0 || !phoneFields[0].value.trim()) {
      setErrors({ phone: "Телефон обов'язковий" });
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    
    const primaryPhone = phoneFields[0].value;
    
    const primaryEmail = emailFields.length > 0 ? emailFields[0].value : undefined;
    
    if (isEditing && contact && onEditContact) {
      onEditContact({
        id: contact.id,
        name: fullName,
        email: primaryEmail,
        phone: primaryPhone
      });
    } else {
      onAddContact({
        id: Date.now().toString(),
        name: fullName,
        email: primaryEmail,
        phone: primaryPhone
      });
    }

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhoneFields([]);
    setEmailFields([]);
    setErrors({});
    setIsEditing(false);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const addPhoneField = () => {
    if (phoneFields.length === 0) {
      setPhoneFields([{ id: Date.now().toString(), value: "" }]);
    }
  };

  const addEmailField = () => {
    if (emailFields.length === 0) {
      setEmailFields([{ id: Date.now().toString(), value: "" }]);
    }
  };

  const updatePhoneField = (id: string, value: string) => {
    setPhoneFields(phoneFields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
    setErrors(prev => ({ ...prev, phone: undefined }));
  };

  const updateEmailField = (id: string, value: string) => {
    setEmailFields(emailFields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  };

  const removePhoneField = (id: string) => {
    setPhoneFields(phoneFields.filter(field => field.id !== id));
  };

  const removeEmailField = (id: string) => {
    setEmailFields(emailFields.filter(field => field.id !== id));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Скасувати</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>
            {isEditing ? "Редагувати контакт" : "Новий контакт"}
          </Text>
          
          <TouchableOpacity 
            onPress={handleSubmit}
            style={styles.doneButton}
            disabled={!firstName.trim() || phoneFields.length === 0}
          >
            <Text style={[
              styles.doneText, 
              (!firstName.trim() || phoneFields.length === 0) && styles.disabledText
            ]}>
              Готово
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.formContainer}>
          <View style={styles.section}>
            <TextInput
              style={styles.input}
              placeholder="Ім'я"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#8e8e93"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Прізвище"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#8e8e93"
            />
          </View>

          <View style={styles.section}>
            {phoneFields.map((field) => (
              <View key={field.id} style={styles.fieldContainer}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Телефон"
                  value={field.value}
                  onChangeText={(value) => updatePhoneField(field.id, value)}
                  placeholderTextColor="#8e8e93"
                  keyboardType="phone-pad"
                />
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removePhoneField(field.id)}
                >
                  <Ionicons name="close-circle" size={24} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            ))}
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            
            {phoneFields.length === 0 && (
              <TouchableOpacity style={styles.addField} onPress={addPhoneField}>
                <View style={styles.addIconContainer}>
                  <View style={styles.addIcon}>
                    <Ionicons name="add" size={22} color="white" />
                  </View>
                </View>
                <Text style={styles.addText}>додати телефон</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            {emailFields.map((field) => (
              <View key={field.id} style={styles.fieldContainer}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Email"
                  value={field.value}
                  onChangeText={(value) => updateEmailField(field.id, value)}
                  placeholderTextColor="#8e8e93"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeEmailField(field.id)}
                >
                  <Ionicons name="close-circle" size={24} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            ))}
            
            {emailFields.length === 0 && (
              <TouchableOpacity style={styles.addField} onPress={addEmailField}>
                <View style={styles.addIconContainer}>
                  <View style={styles.addIcon}>
                    <Ionicons name="add" size={22} color="white" />
                  </View>
                </View>
                <Text style={styles.addText}>додати email</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default AddContactModal;