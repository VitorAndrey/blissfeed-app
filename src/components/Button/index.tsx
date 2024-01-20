export function Button({ onPress, label, ...rest }: Props) {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <View {...props}>
        <Text variant="buttonLabel">{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
