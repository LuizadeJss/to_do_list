// Componente do menu lateral
import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { styles } from '../../theme/styles';

export function SideSheet({ visible, onClose, children }) {
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sideSheet, { transform: [{ translateX: slideAnim }] }]}>
        {children}
      </Animated.View>
    </Modal>
  );
}