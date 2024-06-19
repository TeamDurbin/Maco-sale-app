import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { TextInput } from '@react-native-material/core';
import SelectMultiple from 'react-native-select-multiple';
import moment from 'moment';

const NewInteration = () => {
    const [interactionCount, setInteractionCount] = useState(0);
    const [interactions, setInteractions] = useState([]);
    const [showLeadPopup, setShowLeadPopup] = useState(false);
    const [leadDetails, setLeadDetails] = useState({});
    const [dateRange, setDateRange] = useState({ startDate: moment(), endDate: moment() });
    const departments = ['HSM 1', 'HSM 2', 'EAF 1', 'Procurement', 'Others'];
    const personsMetOptions = ['Ram', 'Shyam', 'Jadu', 'Madhu', 'Hari', 'Ratan'];
    const productOptions = ['Deublin', 'Genie', 'Koba', 'Jaure', 'Gewes'];
  
    const addInteraction = () => {
      setInteractionCount(interactionCount + 1);
      const newInteraction = {
        id: interactionCount + 1,
        interactionID: `${interactionCount + 1 < 10 ? '0' : ''}${interactionCount + 1}`,
        selectedDepartments: [],
        selectedPersonsMet: [],
        selectedProducts: [],
        productInteractions: [],
      };
      setInteractions([...interactions, newInteraction]);
    };
  
    const updateInteraction = (id, key, value) => {
      const updatedInteractions = interactions.map((interaction) =>
        interaction.id === id ? { ...interaction, [key]: value } : interaction
      );
      setInteractions(updatedInteractions);
    };
  
    const addProductInteraction = (interactionID, selectedProducts) => {
      const updatedInteractions = interactions.map((interaction) => {
        // console.log(selectedProducts, interaction, interactionID)
        if (interaction.id === interactionID) {
          const newProductInteractions = selectedProducts.map((product) => ({
            product: product.value,
            interactionID: `${interaction.interactionID}/${product.value}`,
            objective: '',
            linkEarlierInteraction: '',
            discussion: '',
            nextStep: '',
            followUpDate: '',
            objectiveSuccess: '',
            commentsFromPM: '',
          }));
          return { ...interaction, productInteractions: newProductInteractions };
        }
        return interaction;
      });
      setInteractions(updatedInteractions);
    };
  
    const generateLead = (productInteractionID, product, interactionID) => {
      const interaction = interactions.find((i) => i.id === interactionID);
      const productInteraction = interaction.productInteractions.find(
        (pi) => pi.interactionID === productInteractionID
      );
      setLeadDetails({
        customerName: '',
        personsMet: interaction.selectedPersonsMet.join(', '),
        product,
        date: `${dateRange.startDate.format('YYYY-MM-DD')} to ${dateRange.endDate.format('YYYY-MM-DD')}`,
        comments: productInteraction.discussion,
      });
      setShowLeadPopup(true);
    };
  
    const closeLeadPopup = () => {
      setShowLeadPopup(false);
    };
  
    const submitLead = () => {
      alert('Lead generated in Odoo with lead number ...');
      closeLeadPopup();
    };
  
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
    <ScrollView>
      <Button title="Add Interaction" onPress={addInteraction} />
      {interactions.map((interaction, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Interaction {interaction.id} ({interaction.interactionID})
          </Text>
          <Text>Department</Text>
          <SelectMultiple
            items={departments}
            selectedItems={interaction.selectedDepartments}
            onSelectionsChange={(selected) =>
              updateInteraction(interaction.id, 'selectedDepartments', selected)
            }
          />
          <Text>Persons Met</Text>
          <SelectMultiple
            items={personsMetOptions}
            selectedItems={interaction.selectedPersonsMet}
            onSelectionsChange={(selected) =>
              updateInteraction(interaction.id, 'selectedPersonsMet', selected)
            }
          />
          <Text>Select Products</Text>
          <SelectMultiple
            items={productOptions}
            selectedItems={interaction.selectedProducts}
            onSelectionsChange={(selected) =>
              updateInteraction(interaction.id, 'selectedProducts', selected)
            }
          />
          <Button
            title="Add Product Interaction"
            onPress={() => addProductInteraction(interaction.id, interaction.selectedProducts)}
          />
          {interaction.productInteractions.map((productInteraction, pIndex) => (
            <View key={pIndex} style={{ marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Add Information for {productInteraction.product} ({productInteraction.interactionID})
              </Text>
              <Button
                title="Remove"
                onPress={() =>
                  updateInteraction(
                    interaction.id,
                    'productInteractions',
                    interaction.productInteractions.filter((pi) => pi !== productInteraction)
                  )
                }
              />
              <TextInput
              label='Objective'
                value={productInteraction.objective}
                onChangeText={(text) =>
                  updateInteraction(interaction.id, 'productInteractions', interaction.productInteractions.map((pi) => pi === productInteraction ? { ...pi, objective: text } : pi))
                }
              />
              <TextInput
              label='Discussion'
                value={productInteraction.discussion}
                onChangeText={(text) =>
                  updateInteraction(interaction.id, 'productInteractions', interaction.productInteractions.map((pi) => pi === productInteraction ? { ...pi, discussion: text } : pi))
                }
              />
              <Button
                title="Generate Lead"
                onPress={() => generateLead(productInteraction.interactionID, productInteraction.product, interaction.id)}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>

    {showLeadPopup && (
      <View style={{ position: 'absolute', top: 50, left: 50, right: 50, padding: 20, backgroundColor: 'white', borderRadius: 10, zIndex: 10 }}>
        <Text>Lead Details</Text>
        <Text>Customer Name</Text>
        <TextInput value={leadDetails.customerName} onChangeText={(text) => setLeadDetails({ ...leadDetails, customerName: text })} />
        <Text>Persons Met</Text>
        <TextInput value={leadDetails.personsMet} onChangeText={(text) => setLeadDetails({ ...leadDetails, personsMet: text })} />
        <Text>Product</Text>
        <TextInput value={leadDetails.product} onChangeText={(text) => setLeadDetails({ ...leadDetails, product: text })} />
        <Text>Date</Text>
        <TextInput value={leadDetails.date} onChangeText={(text) => setLeadDetails({ ...leadDetails, date: text })} />
        <Text>Comments</Text>
        <TextInput value={leadDetails.comments} onChangeText={(text) => setLeadDetails({ ...leadDetails, comments: text })} />
        <Button title="Submit Lead" onPress={submitLead} />
        <Button title="Close" onPress={closeLeadPopup} />
      </View>
    )}


  </SafeAreaView>
  )
}

export default NewInteration