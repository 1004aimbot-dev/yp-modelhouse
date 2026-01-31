import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import math

class DuplexGenerator:
    def __init__(self, project_name, pyeong, config):
        self.project_name = project_name
        self.pyeong = pyeong
        self.config = config
        self.sqm = pyeong * 3.30578
        
        # Calculate dimensions (approximate)
        # Assume a aspect ratio of roughly 1:1.5 or 1:1.2 for the footprint
        # If duplex (2 floors), footprint is roughly half the total area (minus void)
        # For simplicity, let's assume total area = 1F + 2F.
        # 1F = 60%, 2F = 40% (Loft style)
        self.area_1f = self.sqm * 0.6
        self.area_2f = self.sqm * 0.4
        
        # Sqrt for side length approximation
        self.width = math.sqrt(self.area_1f / 1.5)  # Aspect ratio 1.5
        self.depth = self.width * 1.5
        
        self.output_dir = os.path.join("outputs", project_name)
        self.ensure_dirs()

    def ensure_dirs(self):
        subdirs = ["01_program", "02_plans", "03_sections", "04_elevations", "05_3d", "06_facade", "07_summary"]
        for d in subdirs:
            os.makedirs(os.path.join(self.output_dir, d), exist_ok=True)

    def draw_wall(self, ax, x, y, w, h, thickness=0.2):
        # Outer wall
        ax.add_patch(patches.Rectangle((x, y), w, h, linewidth=2, edgecolor='black', facecolor='none'))
        # Inner wall
        ax.add_patch(patches.Rectangle((x+thickness, y+thickness), w-2*thickness, h-2*thickness, linewidth=1, edgecolor='black', facecolor='none'))

    def generate_plans(self):
        # 1F Plan
        fig, ax = plt.subplots(figsize=(10, 10))
        ax.set_aspect('equal')
        self.draw_wall(ax, 0, 0, self.width, self.depth)
        
        # Add Rooms (Conceptual)
        # Living/Kitchen
        ax.text(self.width/2, self.depth/3, f"Living/Kitchen\n{self.area_1f*0.6:.1f}m2", ha='center', va='center')
        # Bath/Entrance (Placeholder delineation)
        ax.plot([0, self.width], [self.depth*0.2, self.depth*0.2], 'k-', linewidth=1)
        ax.text(self.width/2, self.depth*0.1, "Entrance / Bath", ha='center', va='center')
        
        ax.set_title(f"1F Plan ({self.pyeong} Pyeong Type)")
        ax.set_xlim(-1, self.width+1)
        ax.set_ylim(-1, self.depth+1)
        plt.axis('off')
        plt.savefig(os.path.join(self.output_dir, "02_plans", "plan_1f.png"))
        plt.close()

        # 2F Plan
        fig, ax = plt.subplots(figsize=(10, 10))
        ax.set_aspect('equal')
        self.draw_wall(ax, 0, self.depth*0.4, self.width, self.depth*0.6) # Partial floor
        
        # Void marker
        ax.add_patch(patches.Rectangle((0, 0), self.width, self.depth*0.4, linewidth=1, edgecolor='grey', linestyle='--', facecolor='none'))
        ax.text(self.width/2, self.depth*0.2, "OPEN TO BELOW", ha='center', va='center')
        ax.text(self.width/2, self.depth*0.7, f"Bedroom/Loft\n{self.area_2f:.1f}m2", ha='center', va='center')

        ax.set_title("2F Plan")
        ax.set_xlim(-1, self.width+1)
        ax.set_ylim(-1, self.depth+1)
        plt.axis('off')
        plt.savefig(os.path.join(self.output_dir, "02_plans", "plan_2f.png"))
        plt.close()

    def generate_elevations(self):
        # Front
        fig, ax = plt.subplots(figsize=(8, 8))
        ax.set_aspect('equal')
        
        # Building mass
        height = 6.0 # Approx 2 floors
        ax.add_patch(patches.Rectangle((0, 0), self.width, height, linewidth=2, edgecolor='black', facecolor='white'))
        
        # Roof (Gable default)
        roof_h = 1.5
        ax.plot([0, self.width/2, self.width], [height, height+roof_h, height], 'k-', linewidth=2)
        
        # Windows
        ax.add_patch(patches.Rectangle((self.width*0.2, 1), self.width*0.6, 2, linewidth=1, edgecolor='black', facecolor='#ccf'))
        ax.add_patch(patches.Rectangle((self.width*0.3, 4), self.width*0.4, 1.5, linewidth=1, edgecolor='black', facecolor='#ccf'))

        ax.set_title("Front Elevation")
        ax.set_xlim(-1, self.width+1)
        ax.set_ylim(-1, height+roof_h+1)
        plt.axis('off')
        plt.savefig(os.path.join(self.output_dir, "04_elevations", "front.png"))
        plt.close()

    def generate_sections(self):
        # Section A
        fig, ax = plt.subplots(figsize=(8, 8))
        ax.set_aspect('equal')
        
        height = 6.0
        # Walls
        ax.plot([0, 0], [0, height], 'k-', linewidth=2)
        ax.plot([self.depth, self.depth], [0, height], 'k-', linewidth=2)
        
        # Floors
        ax.plot([0, self.depth], [0, 0], 'k-', linewidth=2) # Ground
        ax.plot([0, self.depth], [3, 3], 'k-', linewidth=1) # 2F
        ax.plot([0, self.depth], [height, height], 'k-', linewidth=2) # Ceiling
        
        ax.set_title("Longitudinal Section")
        ax.set_xlim(-1, self.depth+1)
        ax.set_ylim(-1, height+2)
        plt.axis('off')
        plt.savefig(os.path.join(self.output_dir, "03_sections", "section_a.png"))
        plt.close()

    def run_all(self):
        print(f"Generating designs for {self.project_name} ({self.pyeong} Pyeong)...")
        self.generate_plans()
        self.generate_elevations()
        self.generate_sections()
        print("Done.")

if __name__ == "__main__":
    # Test run
    gen = DuplexGenerator("TestProject", 15, {})
    gen.run_all()
