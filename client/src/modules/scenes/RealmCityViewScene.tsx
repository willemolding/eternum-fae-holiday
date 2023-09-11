import { Model } from "../../components/cityview/CityView";

export const RealmCityViewScene = () => {
  return (
    <>
      <Model />
      <mesh castShadow position-x={-2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh receiveShadow position-y={-1} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </>
  );
};
