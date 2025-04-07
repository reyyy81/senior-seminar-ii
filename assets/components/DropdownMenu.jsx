import React, { useRef, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export const DropdownMenu= ({
    visible,
    handleClose,
    handleOpen,
    trigger,
    children,
    dropdownWidth = 200,
  }) => {
    const triggerRef = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0, width: 0});

    useEffect(() => {
      if (triggerRef.current && visible) {
        triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
          setPosition({x: pageX-20, y: pageY + height, width});
        });
      }
    }, [visible]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOpen}>
      <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {visible && (
        <Modal transparent animationType="fade" visible={visible} onRequestClose={handleClose}>
          <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalOverlay}>
              <View style={[styles.menu, 
              { top: position.y, left: position.x + position.width / 2 - dropdownWidth / 2, width: 150}]}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
          
        </Modal>
      )}
    </View>
  )};

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'transparent',
    },
    menu: {
      position: 'absolute',
      width: 80,
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 10,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 10,
    }
  });