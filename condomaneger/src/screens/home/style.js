import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
      },
      header: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      headerText: {
        marginLeft: 10,
      },
      welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      subText: {
        fontSize: 14,
        color: 'gray',
      },
      card: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      amountText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      defaultCredit: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
      },
      featureContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
      },
      featureButton: {
        flex: 1,
        margin: 5,
      },
      serviceContainer: {
        margin: 10,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      horizontalScroll: {
        marginTop: 10,
      },
      serviceButton: {
        marginRight: 10,
      },
    });