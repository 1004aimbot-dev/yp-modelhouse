import argparse
import json
import os
from duplex_generator import DuplexGenerator

def main():
    parser = argparse.ArgumentParser(description="Duplex House Auto-Generator")
    parser.add_argument("--pyeong", type=float, default=15, help="Floor area in Pyeong")
    parser.add_argument("--name", type=str, default="DuplexTinyHouse", help="Project Name")
    parser.add_argument("--dry-run", action="store_true", help="Skip heavy generation")
    
    args = parser.parse_args()
    
    # 1. Normalize Input (Program)
    program_data = {
        "project_name": args.name,
        "floor_area_pyeong": args.pyeong,
        "floor_area_sqm": args.pyeong * 3.30578,
        "duplex_type": "A", # Default
        "roof_type": "gable" # Default
    }
    
    output_dir = os.path.join("outputs", args.name, "01_program")
    os.makedirs(output_dir, exist_ok=True)
    
    with open(os.path.join(output_dir, "program.json"), "w", encoding="utf-8") as f:
        json.dump(program_data, f, indent=2, ensure_ascii=False)
        
    print(f"Project initialized: {args.name} ({args.pyeong} Pyeong)")
    
    if not args.dry_run:
        generator = DuplexGenerator(args.name, args.pyeong, program_data)
        generator.run_all()
        print(f"Outputs generated in inputs/{args.name}/")

if __name__ == "__main__":
    main()
