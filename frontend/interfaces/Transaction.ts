export default interface Transaction {
  id: number;
  amount: number;
  user_owed_id: number;
  user_owing_id: number;
  group_id: number;
  settled: boolean;
}
