/**
 * Behaviors Module
 * 
 * Behavior registry for handling user interactions and actions.
 * These behaviors can be registered and mapped from JSON configurations.
 */

export * from './navigation';
export * from './gridActions';

export const behaviors = {
  navigation: require('./navigation').navigationBehaviors,
  gridActions: require('./gridActions').gridActionBehaviors,
};
