import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2e',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  cancelButton: {
    padding: 5,
  },
  cancelText: {
    fontSize: 16,
    color: '#007aff',
  },
  doneButton: {
    padding: 5,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
  },
  disabledText: {
    opacity: 0.5,
  },
  formContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  input: {
    height: 44,
    paddingHorizontal: 16,
    fontSize: 17,
    color: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#3c3c3e',
  },
  addField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addIconContainer: {
    marginRight: 15,
  },
  addIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#32d74b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 17,
    color: 'white',
  },
  settingField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 44,
  },
  settingLabel: {
    fontSize: 17,
    color: 'white',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueText: {
    fontSize: 17,
    color: '#007aff',
    marginRight: 6,
  },
  errorText: {
    color: '#ff3b30',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#c6c6c8',
    paddingVertical: 10,
  },
  fieldInput: {
    flex: 1,
    fontSize: 17,
    color: '#f0f0f0',
    paddingVertical: 8,
    paddingLeft: 10,
  },
  removeButton: {
    padding: 8,
  },
});
